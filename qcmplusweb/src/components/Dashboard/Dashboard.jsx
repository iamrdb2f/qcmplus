import React from "react";

const Dashboard = () => {
    return (
        <>
            <div className="d-flex justify-content-around flex-wrap">
            <div className="card" style={{width: "300px", marginTop:"10px", background:"#F3F8FE", border:"none"}}>
                <div className="card-body">
                    <h4 className="card-title">Administrateurs</h4>
                    <p className="text-center"  style={{fontSize:"28px", fontWeight:"bold"}}>4</p>
                </div>
            </div>
            <div className="card" style={{width: "300px", marginTop:"10px", background:"#F3F8FE", border:"none"}}>
                <div className="card-body">
                    <h4 className="card-title">Etudiants</h4>
                    <p className="text-center"  style={{fontSize:"28px", fontWeight:"bold"}}>24</p>
                </div>
            </div>
            <div className="card" style={{width: "300px", marginTop:"10px", background:"#F3F8FE", border:"none"}}>
                <div className="card-body">
                    <h4 className="card-title">Questions</h4>
                    <p className="text-center"  style={{fontSize:"28px", fontWeight:"bold"}}>14</p>
                </div>
            </div>
            <div className="card" style={{width: "300px", marginTop:"25px", background:"#F3F8FE", border:"none"}}>
                <div className="card-body">
                    <h4 className="card-title">Quizs</h4>
                    <p className="text-center"  style={{fontSize:"28px", fontWeight:"bold"}}>18</p>
                </div>
            </div>
            <div className="card" style={{width: "300px", marginTop:"25px", background:"#F3F8FE", border:"none"}}>
                <div className="card-body">
                    <h4 className="card-title">Examens</h4>
                    <p className="text-center"  style={{fontSize:"28px", fontWeight:"bold"}}>20</p>
                </div>
            </div>
            <div className="card" style={{width: "300px", marginTop:"25px", background:"#F3F8FE", border:"none"}}>
                <div className="card-body">
                    <h4 className="card-title">Réponces</h4>
                    <p className="text-center"  style={{fontSize:"28px", fontWeight:"bold"}}>14</p>
                </div>
            </div>
            </div>
        </>
    );
};

export default Dashboard;