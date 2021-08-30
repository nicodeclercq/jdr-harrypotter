echo "Using"
echo "SALT:" $SALT

cat > ./src/secrets.ts << EOF
export const secrets = {
  salt: '$SALT',
};
EOF
