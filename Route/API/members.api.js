/**
 * Node_Modules
 */
const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const members = require('../../Members');
/**
 * Enpoints to get all members in the API
 */
router.get('/',(req,res)=>{
    res.json(members);
});
/**
 * Endpoints to get a single member 
 */

 router.get('/:id',(req,res)=>{
    var found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }else
        res.status(400).json({msg:`No member with id = ${req.params.id} `});
 });
/**
 * Add a members on a API
 */
router.post('/',(req,res)=>{
    //res.send(req.body);
    const newMembers = {
        id : uuid.v4(),
        nom: req.body.nom ,
        prenom:req.body.prenom,
        email: req.body.email,
        status:"active"
    }
    if(!newMembers.nom || !newMembers.prenom || !newMembers.email)
        return res.status(400).json({msg:"Please set a member attribute before post"});
    else{
        members.push(newMembers);
        //return res.json(members);
        return res.redirect('/');
    }
});
/**
 * Update a member on API
 */
router.put('/:id',(req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        const updateMember = req.body;
        members.forEach(member =>{
            if(member.id === parseInt(req.params.id)){
                member.nom = updateMember.nom ? updateMember.nom : member.nom;
                member.prenom = updateMember.prenom ? updateMember.prenom: member.prenom;
                member.email = updateMember.email ? updateMember.email : member.email;

                return res.json({msg:'update success', member});
            }
        });
    }else
        res.status(400).json({msg:`No member with id = ${req.params.id} `});
 });

 /**
 * Endpoints to delete a single member 
 */

router.delete('/:id',(req,res)=>{
    var found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.json({
            msg:'Member deleted success',
            members:members.filter(member => member.id !== parseInt(req.params.id))
        });
    }else
        res.status(400).json({msg:`No member with id = ${req.params.id} `});
 });
 module.exports = router;