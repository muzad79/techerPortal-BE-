import Student from "../models/student.mjs";
import { createDocument, deleteDocument, getAllDocuments,getSingleDocument,searchDocuments, updateDocument } from "../services/dbServices.mjs";



export async function getStudents(req, res) {
    try {
      const students = await getAllDocuments(Student);
      
      res.status(200).json({message:"students fetched successfully",data:students});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error:"internal server error"  });
    }
  }

export async function addStudent(req,res){
    const {name,subject,marks} = req.body;
try{
    let student = await getSingleDocument(Student,{name:name,subject:subject})
    if(student){
      const updatedStudent = await updateDocument(
        Student,
        { _id:student?._id},
        {name,marks,subject}
      );
      return res.status(201).json({message:"Marks updated successfully"})

    }
    createDocument(Student,{name,subject,marks,isDeleted:false})
    return res.status(201).json({message:"student added successfully"})
}
catch(err){
    console.log(err)
    res.status(500).json({message:"internal server errrror"})
}
}

export async function editStudent(req, res) {
    const{name,marks,subject} = req.body;
    try {
     const updatedStudent = await updateDocument(
        Student,
        { _id: req.params.id },
        {name,marks,subject}
      );
      if (!updatedStudent) {
         res.status(220).json({ error:"could not update Student"  });
         return
      }
      res.json({message:"student updated successfully",data:updatedStudent});
    } catch (error) {
      console.error(`Error updating Student: ${error}`);
      res.status(500).json({ error:"internal server error"  });
    }
  }
 




export async function deleteStudent(req,res){

  try{
   const isDeleted= await deleteDocument(Student,{_id:req?.params?.id})
   if(isDeleted){
    return res.status(201).json({message:"Student succesfully deleted "})
   }
   return res.status(220).json({message:"student not deleted "})
  

  }
  catch(err){
    console.log(err)
    res.status(500).json({message:"internal server error"})
  }

}
export async function searchStudents(req, res){
    const { query } = req.query;
    if (!query) {
       res.status(220).json({ error: 'Query parameter is required' });
       return
    }
  
    try {
      const students = await searchDocuments(Student, {
        $or: [
          { name: { $regex: query , $options: 'i' } },
          { subject: { $regex: query , $options: 'i' } },
        ],
      });
      res.json(students);
    } catch (error) {
      console.error(`Error searching places: ${error}`);
      res.status(500).json({ error:"internal server error"});
    }
  }

export async function getStudent(req,res){
  try{
    let student = await getSingleDocument(Student,{_id:req?.params?.id})
    if(!student){
      return res.status(220).json({message:"student not found"})
    }
    return res.status(200).json({messgae:"student found successfully",data:{name:student?.name,subject:student?.subject,marks:student?.marks}})
  }
  catch(err){
    console.log(err)
    return res.status(500).json({message:"internal server error"})
  }
}







