import json
def handler(event, context):
    print("Event: ", event)

    return {
        'statusCode': 200,
        'body': json.dumps({"msg": 'Hello world'}),
        'headers': {
            'Access-Control-Allow-Origin': '*',  # Allow all origins
            'Access-Control-Allow-Headers': 'Content-Type',  # Allow specific headers
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'  # Allow specific methods
        },
    }