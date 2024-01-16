const pool = require("./db");

exports.handler = async (event) => {
  // TODO implement
  let payload = {rows: null}
  
  try{
    
    if(event.service === "User"){
      switch(event.method){
        case "GET":
          if(event.payload.login){
            let res = await pool.query("SELECT EXISTS(SELECT 1 FROM users WHERE username = $1 and password = $2);", [event.payload.username, event.payload.password])
            if(res.rows[0].exists){
              payload = await pool.query("SELECT user_id FROM users WHERE username = $1 AND password = $2;", [event.payload.username, event.payload.password])
            }
          }
          else
            payload = await pool.query("SELECT * FROM users");
          break;
        case "PUT":
          payload = await pool.query("INSERT INTO users(username, password) VALUES ($1, $2);", [event.payload.username, event.payload.password])
          break;
      }
    }
    
    if(event.service === "Exercise"){
      const params = event.payload
      switch(event.method){
        case "GET":
          if(event.payload === null)
            payload = await pool.query("SELECT * FROM exercises")
          //get specific exercise
          else if(Object.keys(event.payload).length >= 2){
            payload = await pool.query("SELECT * from exercises WHERE users = $1 and exercise_id = $2;", [event.payload.userid, event.payload.id])
          }
          else{
            payload = await pool.query("SELECT * from exercises WHERE users = $1;", [event.payload.id])
          }
          break
        case "PUT":
            const arr = [params.description, params.duration, params.date, params.users]
            payload = await pool.query("INSERT INTO exercises(description, duration, date, users) VALUES($1, $2, $3, $4);", arr)
            break;
        case "UPDATE":
          payload = await pool.query("UPDATE exercises SET description = $1, duration = $2, date = $3 WHERE exercise_id = $4", [params.description, params.duration, params.date, params.id])
          break;
        case "DELETE":
          payload = await pool.query("DELETE FROM exercises WHERE exercise_id = $1", [event.payload.id])
          break;
      }
    }
    
  }
  catch(e){
    console.log("error is "+e)
  }

  const response = {
    statusCode: 200,
    body: payload.rows,
  };
  return response;
};
