# https://github.com/ryanbekabe/WAGW_JS

3:36 PM 3/9/2025 hanyajasa.com | Palangka Raya

```
curl -X POST http://172.23.240.1:3000/send-message \
	-H "Content-Type: application/json" \
	-d '{
           "number": "6282254205110",
           "message": "Halo"
         }'

curl -X POST http://172.23.240.1:3000/send-image \
	-H "Content-Type: application/json" \
	-d '{
           "number": "6282254205110",
           "caption": "Halo img",
           "imageUrl": "http://172.23.253.201/lab/favicon.png"
         }'

curl -X POST http://172.23.240.1:3000/send-file \
	-H "Content-Type: application/json" \
	-d '{
           "number": "6282254205110",
           "caption": "Haloberkas",
           "fileUrl": "http://172.23.253.201/lab/tes.txt",
           "fileName": "Namafile.txt"
         }'
```
