const axios = require('axios')


const getObjectives = async () => {
    let auth = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTJmNGQ1YTg1ZTFjNWJhNWZjOTk1ZSIsImlhdCI6MTYzMDMyMjI4NSwiZXhwIjoxNjMyOTE0Mjg1fQ.520hEm5PtjqYRJ2Hvan0aLkrfUSQKUoJdbAEk9zzbjE'
    const response = await axios.get('http://192.168.1.231:2002/api/v1/objectives', {
        headers: {
            'Authorization': `Bearer ${auth}`
        }
    })
    console.log(response.data.data)
    return response.data.data
}

getObjectives()