import { Router } from 'express';
import db from '../db.js';
const router=Router();
router.get('/',async(_req,res)=>{try{const [rows]=await db.query('SELECT * FROM books ORDER BY title');res.json(rows);}catch(e){res.status(500).json({message:'Could not load books'});}});
router.post('/',async(req,res)=>{const {title,author,genre,isbn,quantity}=req.body;if(!title||!author||!genre||!isbn||!Number.isInteger(Number(quantity))||Number(quantity)<0)return res.status(400).json({message:'Enter valid book details'});try{const [r]=await db.execute('INSERT INTO books(title,author,genre,isbn,quantity) VALUES(?,?,?,?,?)',[title,author,genre,isbn,Number(quantity)]);res.status(201).json({id:r.insertId,message:'Book added'});}catch(e){res.status(e.code==='ER_DUP_ENTRY'?409:500).json({message:e.code==='ER_DUP_ENTRY'?'ISBN already exists':'Could not add book'});}});
router.put('/:id',async(req,res)=>{const {title,author,genre,isbn,quantity}=req.body;try{const [r]=await db.execute('UPDATE books SET title=?,author=?,genre=?,isbn=?,quantity=? WHERE id=?',[title,author,genre,isbn,Number(quantity),req.params.id]);if(!r.affectedRows)return res.status(404).json({message:'Book not found'});res.json({message:'Book updated'});}catch(e){res.status(500).json({message:'Could not update book'});}});
router.delete('/:id',async(req,res)=>{try{await db.execute('DELETE FROM books WHERE id=?',[req.params.id]);res.json({message:'Book deleted'});}catch(e){res.status(409).json({message:'Book cannot be deleted while it has transaction records'});}});
export default router;
