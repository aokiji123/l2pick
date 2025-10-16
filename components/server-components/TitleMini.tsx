import React from 'react'

interface props {
  title: string;
  className?: string;
}

const Titlemini = ({title, className}: props) => {
  return (
    <h3 className={`text-brand-primary-3 dark:text-white font-extrabold leading-4 ${className}`}>{title}</h3>
  )
}

export default Titlemini