import classes from './Checkout.module.css';
import useInput from '../../hooks/use-input';

const isNotEmpty = (value) => {
  return value.trim() !== "";
};

const Checkout = (props) => {

  const {
    value :enteredName,
    hasError: nameHasError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    inputResetHandler: nameResetHandler,
  } = useInput(isNotEmpty);

  const {
    value :enteredStreet,
    hasError: streetHasError,
    inputChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    inputResetHandler: streetResetHandler,
  } = useInput(isNotEmpty);

  const {
    value :enteredPostalCode,
    hasError: postalCodeHasError,
    inputChangeHandler: postalCodeChangeHandler,
    inputBlurHandler: postalCodeBlurHandler,
    inputResetHandler: postalCodeResetHandler,
  } = useInput(isNotEmpty);

  const {
    value :enteredCity,
    hasError: cityHasError,
    inputChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    inputResetHandler: cityResetHandler,
  } = useInput(isNotEmpty);

  const invalidForm = nameHasError || streetHasError || postalCodeHasError || cityHasError;

  const confirmHandler = (event) => {
    event.preventDefault();

    if(invalidForm){
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });

    nameResetHandler();
    streetResetHandler();
    postalCodeResetHandler();
    cityResetHandler();
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${nameHasError && classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' onChange={nameChangeHandler} onBlur={nameBlurHandler} value={enteredName}/>
        {nameHasError && <p className={classes['error-text']}>Enter valid name..</p>}
      </div>
      <div className={`${classes.control} ${streetHasError && classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' onChange={streetChangeHandler} onBlur={streetBlurHandler} value={enteredStreet} />
        {streetHasError && <p className={classes['error-text']}>Enter valid street..</p>}
      </div>
      <div className={`${classes.control} ${postalCodeHasError && classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' onChange={postalCodeChangeHandler} onBlur={postalCodeBlurHandler} value={enteredPostalCode} />
      </div>
      <div className={`${classes.control} ${cityHasError && classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' onChange={cityChangeHandler} onBlur={cityBlurHandler} value={enteredCity} />
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} disabled={invalidForm}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
