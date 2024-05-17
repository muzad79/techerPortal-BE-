

// Function to create a new document
export async function createDocument(
    model,
    data
  ) {
    try {
      return await model.create(data);
    } catch (error) {
      throw new Error(`Error creating document: ${error}`);
    }
  }
  
  // Function to get all documents
  export async function getAllDocuments(
    model,
   
  ) {
    try {
      
      return await model.find({isDeleted:false}).exec();
    } catch (error) {
      throw new Error(`Error getting documents: ${error}`);
    }
  }
  //Function to get particular document
  
  export async function getparticularDocuments(
    model,
    filter
  ){
    try {
      return await model.find(filter).exec();
    } catch (error) {
      throw new Error(`Error getting documents: ${error}`);
    }
  }
  
  // Function to get a single document
  export async function getSingleDocument(
    model,
    filter
  ) {
    try {
      return await model.findOne(filter).exec();
    } catch (error) {
      throw new Error(`Error getting document: ${error}`);
    }
  }
  
  // Function to update a document
  export async function updateDocument(
    model,
    filter,
    update
  ){
    try {
      return await model.findOneAndUpdate(filter, update, { new: true }).exec();
    } catch (error) {
      throw new Error(`Error updating document: ${error}`);
    }
  }
  
  // Function to search for documents
  export async function searchDocuments(
    model,
    filter
  ){
    try {
      return await model.find(filter).exec();
    } catch (error) {
      throw new Error(`Error searching documents: ${error}`);
    }
  }
  
  // Function to delete a document
  export async function deleteDocument(
    model,
    filter
  ){
    try {
      if(process.env.MODE == "development")
      {
      const result = await model.deleteOne(filter).exec();
      return result.deletedCount === 1;
      }
      else{
        const user = await model.findOneAndUpdate(filter,{isDeleted:true}).exec();
        if(user){
          return true
        }
  
      }
    } catch (error) {
      throw new Error(`Error deleting document: ${error}`);
    }
  }
  