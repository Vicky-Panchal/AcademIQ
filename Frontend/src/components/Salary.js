import React, { useEffect, useState } from "react";

const Salary = ({ user }) => {
  const [salaryDetails, setSalaryDetails] = useState(null);
  const [error, setError] = useState(null);

  const fetchSalaryDetails = async () => {
    try {
      const response = await fetch("http://example.com/api/salary", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user?.access_token || ""}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch salary details");
      }

      const data = await response.json();
      setSalaryDetails(data);
    } catch (err) {
      console.error("Error fetching salary details:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    if (user?.access_token) {
      fetchSalaryDetails();
    } else {
      setError("User not authenticated");
    }
  }, [user]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!salaryDetails) {
    return <div>Loading salary details...</div>;
  }

  return (
    <div className="salary-page">
      <div className="salary-container">
        <div className="salary-header">
          <h1 className="salary-heading">Salary Details</h1>
          <p>Name: {salaryDetails.employeeName}</p>
          <p>Payment Date: {salaryDetails.paymentDate}</p>
        </div>
        <div className="total-salary">
          <h2 className="section-heading">Total Salary Breakdown</h2>
          <div className="salary-breakdown">
            <div>
              <p>Gross Salary:</p>
              <p>Taxes:</p>
              <p>Description:</p>
              <p className="net-salary">Net Salary:</p>
            </div>
            <div>
              <p>₹{salaryDetails.totalSalary}</p>
              <p>{salaryDetails.taxes || "18%"}</p>
              <p>{salaryDetails.description}</p>
              <p className="net-salary">₹{salaryDetails.netSalary}</p>
            </div>
          </div>
        </div>
        <div className="salary-history">
          <h2 className="section-heading">Salary Disbursement History</h2>
          <ul className="history-list">
            {salaryDetails.history.map((item, index) => (
              <li key={index} className="history-item">
                <span>{new Date(item.paymentDate).toLocaleDateString()}</span>
                <span>Amount: ₹{item.amount}</span>
                <button>Download Slip</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Salary;
