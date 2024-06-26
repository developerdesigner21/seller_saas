import React, { useEffect } from 'react'
import { getAPICall } from '../../../../../api/common/rxApiStoreBase';
import { getUserList } from '../../../../../api/adminApi';

export default function ManageUser() {
  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async() => {
    const apiRequestData =await getUserList();
    const postLoginApi$ = await getAPICall(apiRequestData.apiEndPoint,apiRequestData.configData)

    postLoginApi$.subscribe({
      next:(res)=>{
        console.log("re::::::",res)
      },
      error:(err)=>{
        console.log("err:",err);
      }
    })
  }
  
  return (
    <div>manageUser</div>
  )
}
