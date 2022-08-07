import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";

const AddFoodProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [img, setImg] = useState('');
  const [desc, setDesc] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
        e.preventDefault();
        const res = await axios.post("/api/items", {title:name, price, category, image01: img, desc});
        navigate('/foods');
  }

    return (
      <Helmet title="Add New Food Item">
        <CommonSection title="Add New Food Item" />
        <div>
            <form className="form mb-5 mt-5" onSubmit={submitHandler}>
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Food name"
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="number"
                        placeholder="Food Price"
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Food Category"
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Food Image Link"
                        onChange={(e) => setImg(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <textarea
                        rows={5}
                        type="text"
                        placeholder="Food Description"
                        onChange={(e) => setDesc(e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className="addToCart-btn">
                      Submit
                    </button>
                  </form>
                </div>
                </Helmet>
    
    );
}
 
export default AddFoodProduct;