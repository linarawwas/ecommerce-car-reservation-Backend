import Contact from "../models/contactModel.js";

const getAll = async (req, res) =>{
    const all_contacts = await Contact.find();
    res.json({
        message:"All contacts",
        status:200,
        data:all_contacts,
    })
}


const createContact = async (req, res) =>{
    const { name , email , phoneNumber , message} = req.body;
    const contact = new Contact({ name , email , phoneNumber , message });
        try{
            const savedContact = await contact.save();
            res.json({
                message:"Contacts created successfully",
                status:201,
                data:savedContact,
            })
        }
        catch (error){
            res.json({
                message:"Contact created failed",
                status:203,
                            }) 
        }
    

}


const updateContact = async (req, res) => {
    const contactId = req.params.id;
    try {
        if (!req.body.title) {
            throw new Error("Contact updated failed");
        }
        const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body);
        res.json({
            message: "Contact updated successfully",
            status: 200,
            data: updatedContact,
        });
    } catch (error) {
        res.json({
            message: "Contact updated failed",
            status: 203,
        });
    }
};
        
    


// const createProgram = async (req, res) =>{
//     const program = new Program(req.body);
//         if(!req.body.title){
//             res.json({
//                 message:"Program created failed",
//                 status:203,
//             }) 
//         }
//         const savedProgram = await program.save();
//         res.json({
//             message:"Program created successfully",
//             status:201,
//             data:savedProgram,
//         })

// }

const getContactById = async (req, res) =>{
    const contactId = req.params.id;
        const contact = await Contact.findById(contactId);
            res.json({
                message:"Contact found",
                status:200,
                data:contact,
            })
        }


        


            const deleteContact = async (req, res) =>{
                const contactId = req.params.id;
                    const deletedContact = await Contact.findByIdAndDelete(contactId);
                    res.json({
                        message:"Contact deleted successfully",
                        status:200,
                        data:deletedContact,
                    })

                }
    







export default {getAll,createContact,getContactById,updateContact,deleteContact}