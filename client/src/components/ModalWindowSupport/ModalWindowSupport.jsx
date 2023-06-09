import React from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import './ModalWindowSupport.scss'

let style = {}

const TestModalWindow = (props) => {
  const handleClose = () => props.setOpen(false)
  let dopname = props.dopname ? props.dopname : ''
  const position = 'absolute'
  const top = '50%'
  const left = '50%'
  let width
  const transform = 'translate(-50%, -50%)'
  if (dopname === 'support') {
    width = 444
  } else {
    width = 540
  }

  const bgcolor = '#FFFFFF'
  const borderRadius = '10px'

  style = {
    position,
    top,
    left,
    transform,
    width,
    bgcolor,
    borderRadius,
  }

  return (
    <>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div>{props.children}</div>
        </Box>
      </Modal>
    </>
  )
}

export default TestModalWindow
