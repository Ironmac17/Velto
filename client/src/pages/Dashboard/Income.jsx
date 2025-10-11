import React, { useEffect, useState } from 'react'
import DashboardLayout from "../../components/Layouts/DashboardLayout"
import IncomeOverview from '../../components/Income/IncomeOverview'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/Modal/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';


const Income = () => {

  const [incomeData,setIncomeData]=useState([]);
  const [loading,setLoading]=useState(false);
  const [openDeleteAlert,setOpenDeleteAlert]=useState({
    show:false,
    data:null,
  });
  const [openAddIncomeModel,setOpenAddIncomeModel]=useState(false)

  const fetchIncomeDetails=async () =>{
    if(loading) return;

    setLoading(true);
    try{
      const response=await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if(response.data){
        setIncomeData(response.data);
      }
    } catch(error){
      console.log("Something went wrong.Please try again",error)
    } finally{
      setLoading(false);
    }
  }

  const handleAddIncome=async ()=>{
    
  }

  const deleteIncome=async()=>{

  }

  const handleDowloadIncomeDetails=async()=>{

  }

  useEffect(()=>{
    fetchIncomeDetails();

    return () =>{}
  },[])

  return (
    <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={()=> setOpenAddIncomeModel(true)}
            />
          </div>
        </div>
        <Modal 
          isOpen={openAddIncomeModel}
          onClose={()=>setOpenAddIncomeModel(false)}
          title="Add Income"
          >
            <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income