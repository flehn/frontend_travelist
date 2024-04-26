"use client"

import React from 'react';
import { useParams } from "next/navigation";
import ListDetailsComponent from '@/app/components/Lists/view_list/DisplayList'; // Adjust the import path as needed

const ListDetailsPage = () => {
  const params = useParams();
  // Assuming the dynamic route parameter is named 'id' and could be either a string or an array of strings
  const dynamicParams = params ? params['id'] : null;

  console.log(dynamicParams)
  // Check if dynamicParams is a string or the first element if it's an array
  const listId = typeof dynamicParams === 'string' ? parseInt(dynamicParams, 10) :
                Array.isArray(dynamicParams) ? parseInt(dynamicParams[0], 10) : NaN;

  if (isNaN(listId)) {
    return <div>Invalid ID</div>; // Display an error message if ID is not valid
  }

  return (
    <div>
      <ListDetailsComponent listId={listId} />
    </div>
  );
};

export default ListDetailsPage;
