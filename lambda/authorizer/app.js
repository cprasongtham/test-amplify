const axios = require('axios')
require('dotenv').config()
exports.handler = async (event, context) => {
  try {
    /**
     * Check token from HTTP request [event.authorizationToken]
     * and Websocket $connect event [event.headers.auth].
     */
    if (event.authorizationToken || event.queryStringParameters.auth) {
      const token = event.authorizationToken ?? `bearer ${event.queryStringParameters.auth}`
      console.log(token)
      const options = {
        headers: {
          Authorization: token,
        },
      }
      const url = `https://graph.microsoft.com/oidc/userinfo`
      try {
        const userInfo = await getUserInfo(url, options)
        console.log("userInfo: " + JSON.stringify(userInfo))
        if (userInfo) {
          const policy = generatePolicy(
            userInfo.sub,
            'Allow',
            event.methodArn,
          )
          return context.succeed(policy)
        }
      } catch (error) {
        console.log('error :>> ' + error.stack)
        throw Error('Invalid authorization token')
      }
    } else {
      console.log('error :>> ' + error.stack)
      throw Error('Invalid authorization token or header')
    }
  } catch (error) {
    console.log('error :>> ' + error.stack)
    throw Error('Unauthorized')
  }
}

async function getUserInfo(url, options) {
  return new Promise(async (resolve, reject) => {
    await axios
      .get(url, options)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
function generatePolicy(principalId, effect, resource) {
  console.log(principalId)
  const authResponse = { principalId: principalId }
  if (effect && resource) {
    const policyDocument = {
      Version: '2012-10-17',
      Statement: [],
    }
    const statementOne = {
      Action: 'execute-api:Invoke',
      Effect: effect,
      Resource: resource,
    }
    policyDocument.Statement[0] = statementOne
    authResponse.policyDocument = policyDocument
  }
  return authResponse
}
