import {useState} from 'react'
import "./Credits.css"
import { Plus, Minus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Credits = () => {

  const [userData, setUserData] = useState(null);
  const [creditHistory, setCreditHistory] = useState([]);
  const [customCredits, setCustomCredits] = useState(100);
  const [loading, setLoading] = useState(true);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const {
    userCredits,
  } = useAuth();
  

  const credits = 10;

  const creditPackages = [
    { id: 1, name: 'Starter Pack', credits: 100, price: 9.99, popular: false },
    { id: 2, name: 'Professional Pack', credits: 500, price: 39.99, popular: true },
    { id: 3, name: 'Enterprise Pack', credits: 2000, price: 149.99, popular: false },
  ];


  const handleCustomPurchase = () => {

  }

  return (
    <section className='section'>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className='fw-bold'>Credits</h5>
            <div className="alert alert-info mb-4" role="alert">
              <i className="bi bi-info-circle me-2"></i>
              Current Balance: {userCredits} credits
            </div>
          </div>

          <ul className="nav nav-tabs mb-4" id="creditsTabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button 
                className="nav-link active" 
                id="buy-tab" 
                data-bs-toggle="tab" 
                data-bs-target="#buy-tab-pane" 
                type="button" 
                role="tab" 
                aria-controls="buy-tab-pane" 
                aria-selected="true"
              >
                Buy Credits
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button 
                className="nav-link" 
                id="history-tab" 
                data-bs-toggle="tab" 
                data-bs-target="#history-tab-pane" 
                type="button" 
                role="tab" 
                aria-controls="history-tab-pane" 
                aria-selected="false"
              >
                Credit History
              </button>
            </li>
          </ul>


          <div className="tab-content" id="creditsTabsContent">
            <div className="tab-pane fade show active" id="buy-tab-pane" role="tabpanel" aria-labelledby="buy-tab" tabIndex="0">
              <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                {creditPackages.map((pkg) => (
                  <div className="col" key={pkg.id}>
                    <div className="card pricing-card h-100 position-relative">
                      {pkg.popular && (
                        <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill custom-badge">
                          Most Popular
                        </span>
                      )}
                      

                      <div className="custom-card-header">
                        <h5 className="custom-card-title">{pkg.name}</h5>
                        <p className="credits">{pkg.credits} credits</p>
                      </div>



                      <div className="price-container">
                        <p className="price">${pkg.price}</p>
                        <p className="price-per-credit">${(pkg.price / pkg.credits).toFixed(2)} per credit</p>
                      </div>

                      <button className="buy-button">Buy Now</button>

                      {/* <div className="card-header">
                        <h5 className="card-title mb-0">{pkg.name}</h5>
                        <p className="card-text">{pkg.credits} credits</p>
                      </div> */}


                      {/* <div className="card-body">
                        <h3 className="card-title">${pkg.price}</h3>
                        <p className="card-text text-muted small">
                          ${(pkg.price / pkg.credits).toFixed(2)} per credit
                        </p>
                      </div> */}


                      {/* <div className="card-footer">
                        <button 
                          className={`btn ${pkg.popular ? 'btn-primary' : 'btn-outline-secondary'} w-100`}
                          onClick={() => handlePurchase(pkg.id)}
                          disabled={purchaseLoading}
                        >
                          {purchaseLoading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Loading...
                            </>
                          ) : (
                            'Buy Now'
                          )}
                        </button>
                      </div> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


            <div className="">
              <div className="credit-input">
                <div className="d-flex justify-content-between mb-4">
                  <div className="">
                    <h2 className="h4 mb-2">Custom Amount</h2>
                    <p className="text-muted mb-4">How many credits do you need</p>
                  </div>

                  <div className="">
                    <h5 className="mb-0">${(customCredits * 0.09).toFixed(2)}</h5>
                    <small className="text-muted">$0.09/credit</small>
                  </div>
                </div>
                
                <div className="credit-counter">
                  <button 
                    className="btn-counter"
                    // onClick={decreaseCredits}
                    disabled={credits <= 0}
                  >
                    <Minus size={24} />
                  </button>
                  
                  <div className="credit-display">
                    {/* {credits} */}
                    <input 
                      type="number" 
                      className="" 
                      id=""
                      min="10"
                      style={{width: "60px", textAlign: "center", background: "none"}}
                      value={customCredits} 
                      onChange={(e) => setCustomCredits(parseInt(e.target.value) || 10)}
                    />
                  </div>
                  
                  <button 
                    className="btn-counter"
                    // onClick={increaseCredits}
                  >
                    <Plus size={24} />
                  </button>
                </div>

                <div className="price-display">
                  <div className="total-price">
                    {/* ${totalPrice} */}
                  </div>
                  <div className="price-per-credit">
                    {/* ${pricePerCredit} per credit */}
                  </div>
                </div>

                <button className="btn btn-purchase btn-primary">
                  Purchase Credits
                </button>
              </div>

            </div>





        </div>
      </div>
    </section>
  )
}

export default Credits