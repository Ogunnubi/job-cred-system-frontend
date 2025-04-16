import {useState} from 'react'

const Credits = () => {

  const [userData, setUserData] = useState(null);
  const [creditHistory, setCreditHistory] = useState([]);
  const [customCredits, setCustomCredits] = useState(100);
  const [loading, setLoading] = useState(true);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  


  const creditPackages = [
    { id: 1, name: 'Starter Pack', credits: 100, price: 9.99, popular: false },
    { id: 2, name: 'Pro Pack', credits: 500, price: 39.99, popular: true },
    { id: 3, name: 'Enterprise Pack', credits: 2000, price: 149.99, popular: false },
  ];



  return (
    <section className='section'>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className='fw-bold'>Credits</h5>
            <div className="alert alert-info mb-4" role="alert">
              <i className="bi bi-info-circle me-2"></i>
              Current Balance: {"" || 0} credits
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
                  <div className="card h-100 position-relative">
                    {pkg.popular && (
                      <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-primary">
                        Most Popular
                      </span>
                    )}
                    <div className="card-header">
                      <h5 className="card-title mb-0">{pkg.name}</h5>
                      <p className="card-text">{pkg.credits} credits</p>
                    </div>
                    <div className="card-body">
                      <h3 className="card-title">${pkg.price}</h3>
                      <p className="card-text text-muted small">
                        ${(pkg.price / pkg.credits).toFixed(2)} per credit
                      </p>
                    </div>
                    <div className="card-footer">
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>


        </div>
      </div>
    </section>
  )
}

export default Credits