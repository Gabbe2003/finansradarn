#!/usr/bin/env bash
# Deploy custom WP plugins/themes to SiteGround
# Usage: ./deploy-wp.sh

set -e

REMOTE_USER="u2501-w56zuywvkp7h"
REMOTE_HOST="ssh.finansradarn.se"
REMOTE_PORT="18765"
REMOTE_PATH="/home/customer/www/finansradarn.se/public_html/wp-content"
LOCAL_PATH="$(dirname "$0")/apps/wordpress/wp-content"
TMP_KEY="/tmp/sg_deploy_key_$$"

# Decode private key from env (or fall back to key file)
if [ -n "$SSH_PRIVATE_KEY" ]; then
  echo "$SSH_PRIVATE_KEY" | base64 -d > "$TMP_KEY"
else
  cp "$HOME/.ssh/finansradarn_sg" "$TMP_KEY"
fi

# Strip passphrase so rsync/scp can use it non-interactively
ssh-keygen -p -P "${SSH_KEY_PASSPHRASE:-Maiko2013!}" -N "" -f "$TMP_KEY" -q

chmod 600 "$TMP_KEY"

echo "Deploying wp-content to SiteGround..."

scp -r -i "$TMP_KEY" -P "$REMOTE_PORT" -o StrictHostKeyChecking=no \
  "$LOCAL_PATH/plugins/"* \
  "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/plugins/"

rm -f "$TMP_KEY"

echo "Done."
