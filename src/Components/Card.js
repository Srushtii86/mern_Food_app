import React,{useState,useEffect, useRef} from 'react'
import {useCart, useDispatchCart} from './ContextReducer'

export default function Card(props) {
    
    const dispatch = useDispatchCart();
    const data = useCart();

    const priceRef = useRef();

    let options = props.options;
    let priceOptions = options ? Object.keys(options)  : [] ;
    const [qty,setQty] = useState(1);
    const [size,setSize] = useState("");
    
    let finalPrice = qty * parseInt(options[size]);

    const handelAddToCart = async ()=>{
        
        await dispatch({
            type:'ADD' , 
            id: props.foodItem._id, 
            name:props.foodItem.name, 
            img:props.foodItem.img ,
            price:finalPrice, 
            qty:qty, 
            size:size });
        console.log(data);
    }

    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])
    return ( 
        <div>
            <div className="card mt-3" style={{ width: '18rem', maxHeight: '450px' , display: 'flex', flexDirection: 'column' }}>
                <div>
                    <img className="card-img-top" src={props.foodItem.img} alt="Card image cap" style={{ height: '220px',  objectFit: 'fill' }} />
                </div>
                <div className="card-body">
                    <h5 style={{fontWeight: 'bold'}} className="card-title ms-5">{props.foodItem.name}</h5>
                    <div className='container w -100'>
                        <div style={{ display: 'flex', gap: '40px' }}>
                        <select style={{ height: '25px',fontSize: '20px', objectFit:'fill'}} className='m-2 bg-success rounded'  onChange={(e)=>(setQty(e.target.value))}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}> {i + 1} </option>
                                )
                            })}
                        </select>
                        <select style={{height: '25px',fontSize: '20px', objectFit:'fill'}} className='m-2 bg-success rounded' ref={priceRef} onChange={(e)=>(setSize(e.target.value))}>
                            {priceOptions.map((data)=>{
                                return <option key={data} value={data} >{data}</option>
                        })}
                        </select>
                        </div>
                        <div className='h-100 fs-5'>
                            ₹{finalPrice}/-
                        </div>
                        <hr></hr>
                        <button className={`btn btn-success text-white justify-center ms-5`} onClick={handelAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
