
const fetch = require('node-fetch');
const dayjs = require('dayjs')


const handlePostReqAndNavigation = async () => {

    let JWToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjgxNmI0Y2RjY2UzMzJjZDE5NWZlOSIsImlhdCI6MTYzMTIyNzUxNCwiZXhwIjoxNjMzODE5NTE0fQ.LkPb3eLxNqfGFQ2QPSShPILnow5Sxs9zvfy-Mtxxf8s'

    const payload = {
            "description": "Lambert",
            "name": "tessssst 70000! and one!!!",
            "objectiveEndDate": "2021-12-31T06:00:00.000Z",
            "objectiveStartDate": "2021-10-01T05:00:00.000Z"
        }
      

    let response = await fetch('http://192.168.1.231:2002/api/v1/objectives', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JWToken}`
        
      },
      body: JSON.stringify(payload)
      })

      console.log(response)

    }

handlePostReqAndNavigation()