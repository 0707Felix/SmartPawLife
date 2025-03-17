import { Link } from "react-router-dom";

const PayOk = ()=>{

    return(
       <>
              <div className="container-fluid">
                <div className="position-relative d-flex">
                  <div
                    className="container d-flex flex-column"
                    style={{ minHeight: "100vh" }}
                  >

                    <div className="row my-auto pb-7">
                      <div className="col-md-4 d-flex flex-column">
                        <div className="text-center">
                          <h2 className="text-danger fw-bold mb-1">付款成功</h2>
                          <p>
                           訂單已收到.會盡速為您出貨
                          </p>
                          <Link to ="/home" className="btn btn-gray4 m-4 px-5">
                            回主畫面
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="w-md-50 w-100 position-absolute opacity-1"
                    style={{
                      zIndex: -1,
                      minHeight: "100vh",
                      right: 0,
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1721113976125-9ef1dc7a423c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fCVFOCVCMiU5MyVFNyU4QiU5NyVFNSVBRiVCNSVFNyU4OSVBOSVFNyU4MyU5OCVFNCVCOSVCRSVFNyVBRSVCMXxlbnwwfHwwfHx8MA%3D%3Dhttps://media.istockphoto.com/id/1307554983/vector/cartoon-color-dog-supplies-and-equipment-set-vector.webp?a=1&b=1&s=612x612&w=0&k=20&c=NU8GuPLREw9w45qC6lTq_Kyo3y8IE2cB4avazRvmdao=https://media.istockphoto.com/id/1307554983/vector/cartoon-color-dog-supplies-and-equipment-set-vector.webp?a=1&b=1&s=612x612&w=0&k=20&c=NU8GuPLREw9w45qC6lTq_Kyo3y8IE2cB4avazRvmdao=https://media.istockphoto.com/id/1307554983/vector/cartoon-color-dog-supplies-and-equipment-set-vector.webp?a=1&b=1&s=612x612&w=0&k=20&c=NU8GuPLREw9w45qC6lTq_Kyo3y8IE2cB4avazRvmdao=)",
                      backgroundPosition: "center center",
                      backgroundSize: "cover"
                    }}
                  ></div>
                </div>
              </div>    
     </>     
    )
}
export default PayOk;