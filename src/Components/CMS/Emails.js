import { useEffect } from 'react';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getAll, reset } from '../../state/features/mail/mailSlice.js';
import moment from 'moment';
import Spinner from '../../Components/Spinner.js';
import Stack from '@mui/material/Stack';

const Emails = () => {
  const dispatch = useDispatch();
  const { inbox, isLoading, isError, isSuccess, message } = useSelector((state) => state.mail);
  // console.log(state);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // if (isSuccess) {
    //   toast.success(message);
    // }
    dispatch(reset());
  } , [isError, isSuccess, message, dispatch]);;
  
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1>Emails</h1>
      { !inbox.length ? 
        <Button onClick={() => dispatch(getAll())}>Load All Incoming mail</Button>
        : null
      }
      {inbox.length ?
        inbox.map((mail) => (
          <Stack key={mail._id} spacing={1}
            style={{
              width: '90vw',
              margin: 'auto',
              marginTop: '2vh',
              border: 'solid 2px black',
              borderRadius: '8px',
              paddingRight: '1vh',
              paddingLeft: '1vh',
              paddingBottom: '1vh',
            }}>
            <h3>{mail.name}</h3>
            <p>{mail.phone} - {mail.email}</p>
            <p>{mail.message}</p>
            <p>{moment(mail.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
          </Stack>
        )) :
        <p>No mail loaded</p>
      }
    </div>
  );
};

export default Emails;
