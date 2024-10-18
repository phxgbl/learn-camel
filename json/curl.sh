curl -X POST -H "Content-Type: application/json" -d '{
  "table": {
    "name": "todo",
    "schema": "tenant1",
    "description": "todo table to track todos",
    "columns": [
      {
        "name": "id",
        "type": "serial",
        "is_nullable": false,
        "is_unique": true,
        "is_identity": true
      },
      {
        "name": "name",
        "type": "text",
        "is_nullable": false,
        "is_unique": true,
        "is_identity": false
      }
    ]
}
}' http://localhost:9090/processJson
