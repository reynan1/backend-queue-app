const Queue = require('../models/Queue');

const addQueue = async (requestBody) => {
    try {
    
      // get fieldname  
      const { mobileNo, personCount, name } = requestBody;

      // convert it to array keys
      const fieldNames = Object.keys(requestBody)
      
      // initialize fieldname list
      const fieldNameList = ['mobileNo', 'personCount', 'name'];

      // check if the fieldname is equal to database fieldname  
      const checkFieldNameList = fieldNames.every(fieldName => fieldNameList.includes(fieldName));  

      // filter incorrect fieldname
      const filterIncorrectFieldName = fieldNames.filter(fieldName => fieldNameList.indexOf(fieldName) === -1);
      
      // check missing fielname
      const missingFieldName = fieldNameList.filter(fieldName => fieldNames.indexOf(fieldName) === -1);

      // check if the fieldname is equal to fieldname in database
      if(!checkFieldNameList) {
         return {
            message: `Incorrect fieldname: ${filterIncorrectFieldName}`,
            result: false
          }
       } 
                   
       // check the missing fieldnames
       if(fieldNameList.length > fieldNames.length) {
          return {
             message: `Missing fieldname: ${missingFieldName}`,
             result: false
          }
       }

       // Check the missing field for mobile number and person count
      if(mobileNo.length === 0 || personCount.length ==0 ) {
         return {
            message: 'Please complete the missing field',
            result: false,
         }
      }

      let newQueue = new Queue({
            mobileNo: mobileNo,
            personCount: personCount,
            name: name, 
      });

      const addQueue = await newQueue.save();

      if(!addQueue) {
         return {
            message: 'Queue not successfully created',
            result: false,
         } 
      } else {
        
        // count the lenth of user DB and update queueID 
        const dataUser =  await Queue.find({});
        
        // set 3 (000) value  if the dataUserlength is 1 (length 1) add 001 and if length is 10 (length 2) add 010 and if 100 (length 3) no 0 added 
        const setCustomizeValue = (nr, n, str) => {
            return Array(n-String(nr).length+1).join(str||'0')+nr;
         }

        return Queue.findByIdAndUpdate({_id: addQueue._id },{ queueID : `A${setCustomizeValue(dataUser.length,3)}` }).then((users, error) => {
         if(error) {
            return {
               message: 'Queue not successfully created',
               result: false,
            } 
         } else {
            return {
               result: true,
            }
         }
        } )
      }

    } catch(error) {
        console.log(`AddQueue Error: ${error
        } `)
    } 
}

const listQueue = async () => {
   try {
      const result = await Queue.find({ serveDone: false});
      
      if(result.length === 0) {
          return false;
      }

      return result;
   } catch (error) {
      console.log('Error: ', error);
   }
}

const serveQueue = async (queueID, reqBody) => {
   try {

       console.log(reqBody);
      const result = await Queue.findByIdAndUpdate(queueID, {
            serve: reqBody.serve,
       })

       if (!result) {
         return {
            message: 'Serve is not process',
            result: false
        }
       }
   
       result.password = undefined
   
       return {
         message: 'Server update successfully',
         result: true
       }
   } catch (error) {
      console.log('Error: ', error);
   }
}

const serveQueueNow = async () => {
   try {
      const result = await Queue.findOne({ serve: true })

      if(result.length === 0) {
          return false;
      }

      return result;
   } catch (error) {
      console.log('Error: ', error);
   }
}

const serveDone = async (userID, reqBody) => {
   try {
      console.log(reqBody);

      const result = await Queue.findByIdAndUpdate(userID, {
            serve: reqBody.serve,
            serveDone: reqBody.serveDone,
       })

       if (!result) {
         return {
            message: 'Serve done is not process',
            result: false
        }
       }
   
       result.password = undefined
   
       return {
         message: 'Server done successfully',
         result: true
       }
   } catch (error) {
      console.log('Error: ', error);
   }
}

module.exports = {
    addQueue,
    listQueue,
    serveQueue,
    serveQueueNow,
    serveDone, 
}