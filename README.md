
# Usage

```yml
      - name: easy-webhook
        uses: TNT-Likely/webhook-action@V0.1.0
        env:
          webhookUrl: ${{ secrets.WEBHOOK_URL }}
          webhookSecret: ${{ secrets.WEBHOOK_SECRET }}
          data: '{"msgtype": "text","text": {"content":"test data"}}'

```
