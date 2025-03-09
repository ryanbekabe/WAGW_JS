<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WhatsApp Gateway</title>
    <script>
        function sendMessage() {
            const phoneNumber = document.getElementById("phoneNumber").value;
            const message = document.getElementById("message").value;
            
            if (!phoneNumber || !message) {
                alert("Nomor tujuan dan pesan tidak boleh kosong!");
                return;
            }
            
            const data = {
                session: "09032025",
                to: phoneNumber,
                text: message
            };
            
            fetch("http://hanyajasa.com:5001/message/send-text", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => alert("Pesan terkirim: " + JSON.stringify(result)))
            .catch(error => alert("Error: " + error));
        }
    </script>
</head>
<body>
    <h2>WhatsApp Gateway - Kirim Pesan</h2>
    <label for="phoneNumber">Nomor Tujuan:</label>
    <input type="text" id="phoneNumber" placeholder="628xxxxxxxxxx">
    <br><br>
    <label for="message">Pesan:</label>
    <textarea id="message" rows="5" cols="50">Halo 09032025,\n\nIni adalah pesan dari hanyajasa.com:5001 dengan enter.\nSemoga berhasil!</textarea>
    <br><br>
    <button onclick="sendMessage()">Kirim Pesan</button>
</body>
</html>
