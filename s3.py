import boto3
from botocore.exceptions import NoCredentialsError
import glob

ACCESS_KEY = 'AKIAJSBSYSWIQZDFI2MA'
SECRET_KEY = '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'

def upload_to_s3(local_file, bucket, s3_file):
    s3 = boto3.client('s3', aws_access_key_id=ACCESS_KEY,
                      aws_secret_access_key=SECRET_KEY)

    try:
        s3.upload_file(local_file, bucket, s3_file)
        # print("Upload Successful")
        return True
    except FileNotFoundError:
        # print("The file was not found")
        return False
    except NoCredentialsError:
        # print("Credentials not available")
        return False

def delete_from_s3(bucket, s3_file):
    s3 = boto3.client('s3', aws_access_key_id=ACCESS_KEY,
                      aws_secret_access_key=SECRET_KEY)
    try:
        s3.delete_object(Bucket=bucket, Key=s3_file)
        return True
    except Exception as e:
        print(e)
        return False

def sync_from_s3(bucket, folder, local_folder):
    s3 = boto3.client('s3', aws_access_key_id=ACCESS_KEY,
                      aws_secret_access_key=SECRET_KEY)

    try:
        #glob da pasta
        imagens_local = glob.glob('./static/imagens/*.jpg')
        imagens_local =  [i.split("/")[-1] for i in imagens_local]
        #lista dos arquivos s3
        imagens_s3 = s3.list_objects_v2(Bucket=bucket)['Contents']
        imagens_s3 = [i['Key'].split("/")[-1] for i in imagens_s3 if i['Key'].split(".")[-1] == 'jpg' ]
        #se houver arquivos no s3 sem estar na pasta -> faz download
        para_baixar = list(set(imagens_s3) - set(imagens_local))

        for imagem in para_baixar:
            s3.download_file(bucket, folder + imagem, local_folder + imagem)

        return True
    except:
        return False

if __name__ == "__main__":
    uploaded = upload_to_s3('local_file', 'bucket_name', 's3_file_name')
    delete_from_s3('bucket_name', 's3_file_name')
    sync_from_s3('del-vetro', 'imagens/', './static/imagens/')