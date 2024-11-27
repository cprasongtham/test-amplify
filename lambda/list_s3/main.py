import boto3
import json

def handler(event, context):
    s3_client = boto3.client("s3")
    bucket_name = "putest-tfstate"
    try:
        # List files in the bucket
        response = s3_client.list_objects_v2(Bucket=bucket_name)
        if "Contents" in response:
            files = [item["Key"] for item in response["Contents"]]
            return json.dumps({"files": files})
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
