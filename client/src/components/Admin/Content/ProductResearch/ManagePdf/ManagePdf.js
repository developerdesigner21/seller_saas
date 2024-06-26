import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import ListPdf from './ListPdf/ListPdf';
import TestPdf from './TestPdf/TestPdf';

export default function ManagePdf() {
  const [searchParams] = useSearchParams();
  const navigate =  useNavigate()
  const [selectedTab, setSelectedTab] = useState("") 

  useEffect(()=>{
    const tab = searchParams.get('tab')
    if(tab && ["listPdf","testPdf"].includes(tab)){
      setSelectedTab(tab)
    }else{
      navigate("/admin/managePdf?tab=listPdf")
    }
  },[searchParams])

  switch (selectedTab) {
    case 'listPdf':
      return <ListPdf />;
    case 'testPdf':
      return <TestPdf />;
    default:
      return <div></div>;
  }
}
