import { InputBase } from '@mui/material'
import React from 'react'

export default function NavSearch(props) {

  return (
    <form className="google-search" action="https://www.google.com/search" method="get" name="searchform" target="_blank">
      <InputBase name="sitesearch" type="hidden" />
      <InputBase autoComplete="off" name="q" placeholder={`Must see in ${props.searchParam ? props.searchParam : "Tokyo"}...`} type="text" />
    </form>
  )
}