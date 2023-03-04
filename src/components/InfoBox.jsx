import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

const InfoBox = ({title,cases,total}) => {
  return (
      <Card>
        <CardContent>
            <Typography className='' color='textSecondary'>{title}</Typography>
            <h2>{cases}</h2>
            <Typography color='textSecondary'>{total}</Typography>
        </CardContent>
      </Card>
  )
}

export default InfoBox