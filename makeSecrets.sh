echo "Using"

cat > ./src/secrets.ts << EOF
export const secrets = {
  salt: '$SALT',
  apiKey: '$API_KEY',
};
EOF
