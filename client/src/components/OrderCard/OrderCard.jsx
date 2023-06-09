import './OrderCard.scss'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import React from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/cartReducer'
import { AddToCartBtnCollection } from '../../components/AddToCartBtnCollection/AddToCartBtnCollection'

const statusTree = [
  {
    nameStatus: 'Processed',
    title: 'Order is processed',
    text: 'Your order has been received. Thank you!',
  },
  {
    nameStatus: 'Going',
    title: 'Order is going',
    text: 'We complete and pack your order.',
  },
  {
    nameStatus: 'Collected',
    title: 'Order collected',
    text: 'We collected the order and handed it over for delivery.',
  },
  {
    nameStatus: 'OnWay',
    title: 'Order on the way',
    text: 'You will receive your order soon. Wait for a notification or a call from the courier!',
  },
  {
    nameStatus: 'Delivered',
    title: 'Delivered',
    text: 'Thank you, we are glad that you are our client!',
  },
]

// function addToCartFunc(order) {
//   const dispatch = useDispatch()
//   let { id, title, desc, price, img, totalPriceItem, quantity } = order
//   for (let i = 0; i <= order?.attributes?.cartItems?.lenght; i++) {
//     dispatch(
//       addToCart({
//         id: id,
//         title: title,
//         desc: desc,
//         price: price,
//         img: img,
//         totalPriceItem: totalPriceItem,
//         quantity: quantity,
//       })
//     )
//   }
// }

const OrderCard = () => {
  const dispatch = useDispatch()
  const id = Number(useParams().id)
  const { data, error, loading } = useFetch(`orders?filters[id][$eq]=${id}`)

  const order = data?.find((el) => el.id === id)

  const registrationDate = order?.attributes?.createdAt
  const createdAtStr = registrationDate?.slice(0, 10)
  const dateCreatedAtArr = createdAtStr?.split('')
  dateCreatedAtArr?.splice(4, 1, '/')
  dateCreatedAtArr?.splice(7, 1, '/')
  const createdAt = dateCreatedAtArr?.join('')

  const timeDelivery = registrationDate?.slice(11, 19)

  const array = []
  order?.attributes?.cartItems?.map((el) => array.push(el.price * el.quantity))
  const totalAmount = array?.reduce((prev, cur) => prev + cur, 0).toFixed(2)

  let classStatus = ''
  let searchName = order?.attributes?.currentOrderStatus

  let index = -1
  if (order?.attributes?.orderStatus === 'current') {
    index = statusTree.findIndex((el) => el.nameStatus === searchName)
  } else if (order?.attributes?.orderStatus === 'completed') {
    searchName = 'Delivered'
    index = statusTree.findIndex((el) => el.nameStatus === searchName)
  } else if (order?.attributes?.orderStatus === 'canceled') {
    index = -1
  }

  const addToCartFunc = (order) => {
    for (let i = 0; i < order?.attributes?.cartItems?.length; i++) {
      dispatch(
        addToCart({
          id: order?.attributes?.cartItems[i].id,
          title: order?.attributes?.cartItems[i].title,
          desc: order?.attributes?.cartItems[i].desc,
          price: order?.attributes?.cartItems[i].price,
          img: order?.attributes?.cartItems[i].img,
          totalPriceItem: order?.attributes?.cartItems[i].totalPriceItem,
          quantity: order?.attributes?.cartItems[i].quantity,
        })
      )
    }
  }

  return (
    <div className='orderCard'>
      {error ? (
        <Alert severity='error'>Something went wrong!</Alert>
      ) : loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress color='success' />
        </Box>
      ) : (
        <div className='orderCard__leftPart'>
          <Link className='orderCard__linkBack' to='/historyOfOrders'>
            History of orders
          </Link>

          <div className='orderCard__headerBox'>
            <div className='orderCard__heading'>Order №{order?.id}</div>
            <div
              className={
                'orderCard__status_order ' + order?.attributes?.orderStatus
              }
            >
              <span
                className={'icon i' + order?.attributes?.orderStatus}
              ></span>
              {order?.attributes?.orderStatus}
            </div>
          </div>

          <div className='orderCard__content'>
            <div className='orderCard__content_orderInfo'>
              <div className='orderCard__content_infoBox'>
                <div class='orderCard__content_title'>
                  Registration date:&nbsp;
                </div>
                <div className={'orderCard__content_info'}>
                  {`${createdAt} ${timeDelivery}`}
                </div>
              </div>

              <div className='orderCard__content_infoBox'>
                <div class='orderCard__content_title'>Delivery:&nbsp;</div>
                <div className={'orderCard__content_info'}>{createdAt}</div>
              </div>

              <div className='orderCard__content_infoBox'>
                <div class='orderCard__content_title'>Address:&nbsp;</div>
                <div className={'orderCard__content_info'}>
                  {order?.attributes?.deliveryAddress
                    ? order?.attributes?.deliveryAddress
                    : '60-49 Road 11378 NewYork'}
                </div>
              </div>

              <div className='orderCard__content_infoBox'>
                <div class='orderCard__content_title'>
                  Payment method:&nbsp;
                </div>
                <div className={'orderCard__content_info'}>
                  {order?.attributes?.payByCreditCard}
                </div>
              </div>

              <div className='orderCard__content_infoBox'>
                <div class='orderCard__content_title'>Order amount:&nbsp;</div>
                <div className={'orderCard__content_info'}>
                  {totalAmount ? totalAmount : ''}$
                </div>
              </div>

              {/* <Button
                type='button'
                text='Add to cart Order'
                classname='orderCard__content_buttonRepeatOrder'
                onClick={() => addToCartFunc(order)}
              /> */}

              <AddToCartBtnCollection order={order} name='ADD TO CART' />
            </div>
            <div className='orderCard__content_orderItems'>
              <div className='orderCard__content_orderItemsBox_heading'>
                Items in the order:
              </div>

              <div className='orderCard__content_imgOrder_box'>
                {order?.attributes?.cartItems?.map(
                  ({ img, id, quantity }, i) => {
                    return (
                      <div key={i}>
                        <div className='orderCard_boxForItems orderCardPosreletive'>
                          <Link
                            className='orderCard__linkItem'
                            to={`/productpage/${id}`}
                          >
                            <img
                              src={process.env.REACT_APP_UPLOAD_URL + img}
                              alt=''
                              className={'orderCardImgOrder_round'}
                            />
                          </Link>
                          <div className='orderCard_amountItems'>
                            x{quantity}
                          </div>
                        </div>
                      </div>
                    )
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {error ? (
        <Alert severity='error'>Something went wrong!</Alert>
      ) : loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress color='success' />
        </Box>
      ) : (
        <div className='orderCard__rightPart'>
          <div className='orderCard__statusTree'>
            {statusTree.map(({ title, text }, i) => {
              if (i <= index) {
                classStatus = 'statusActive'
              } else {
                classStatus = 'statusClose'
              }
              return (
                <div className='orderCard__statusTree_box'>
                  <div className={'orderCard__statusTree_title' + classStatus}>
                    {title}
                  </div>
                  <div className='orderCard__statusTree_info'>{text}</div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderCard
