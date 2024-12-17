#!/bin/bash

VPN_DATA_DIR="/vpn-data"

if [ ! -f "$VPN_DATA_DIR/config.ovpn" ]; then
    echo "VPN конфигурация не найдена. Генерируем новую..."

    cat > "$VPN_DATA_DIR/config.ovpn" <<EOL
client
dev tun
proto udp
remote vpn.example.com 1194
resolv-retry infinite
nobind
persist-key
persist-tun
ca ca.crt
cert client.crt
key client.key
remote-cert-tls server
cipher AES-256-CBC
verb 3
EOL

    touch "$VPN_DATA_DIR/ca.crt"
    touch "$VPN_DATA_DIR/client.crt"
    touch "$VPN_DATA_DIR/client.key"
fi

echo "VPN конфигурация готова."
