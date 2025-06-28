import { Contact } from "../Models/Contact.js";


export const getAllContact = async(req,res)=>{

     const constactlist= await Contact.find();
     if(!constactlist) return res.json({message:"contact list not exist", success:false})
          return res.json({message:"contact list founded successfully", contactList:constactlist, success:true})
}


export const newContact= async(req,res)=>{
     const {name, email, phone,type   } = req.body;

     if(!name || !email || !phone || !type) return res.json({message:"All fields are required", success:false});

     let saveContact= await Contact.create({name, email, phone,type ,user:req.user});

     return res.json({message:"contact created successfully !!", contact:saveContact, success:true})
}


export const getContactById = async(req, res) => {
    try {
        const id = req.params.id;
        const matchedData = await Contact.findById(id);
        if (!matchedData) return res.json({ message: "Contact does not exist", success: false });
        return res.json({ message: "Contact found successfully", contact: matchedData, success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", success: false });
    }
};


export const updateContactById = async(req, res) => {
    try {
        const id = req.params.id;
             const {name, email, phone,type} = req.body;

        const matchedData = await Contact.findByIdAndUpdate(id,{
         name, email, phone,type  
        },{new:true});
        if (!matchedData) return res.json({ message: "Contact does not exist", success: false });
        return res.json({ message: "Contact found successfully", contact: matchedData, success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", success: false });
    }
};


export const deleteContactById = async(req, res) => {
    try {
        const id = req.params.id;

        const matchedData = await Contact.findByIdAndDelete(id);
        if (!matchedData) return res.json({ message: "Contact does not exist", success: false });
        return res.json({ message: "Contact deleted successfully", contact: matchedData, success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", success: false });
    }
};