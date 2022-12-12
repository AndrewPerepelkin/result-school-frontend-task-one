import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import TextField from '../common/form/textField';
import {validator} from '../../utils/validator';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckBoxField from '../common/form/CheckBoxField';
import {useQualities} from '../../hooks/useQualities';
import {useProfession} from '../../hooks/useProfession';
import {useAuth} from '../../hooks/useAuth';

const RegisterForm = () => {
  const history = useHistory();
  const [data, setData] = useState({
    email: '',
    name: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    licence: false
  });
  const {signUp} = useAuth();
  const [errors, setErrors] = useState({});
  const {qualities} = useQualities();
  const qualitiesList = qualities.map((qual) => ({
    label: qual.name,
    value: qual._id
  }));
  const {professions} = useProfession();
  const professionsList = professions.map((prof) => ({
    label: prof.name,
    value: prof._id
  }));

  useEffect(() => {
    validate();
  }, [data]);

  const handleChange = (target) => {
    setData((prevState) => ({...prevState, [target.name]: target.value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    const newData = {
      ...data,
      qualities: data.qualities.map((q) => q.value)
    };
    try {
      await signUp(newData);
      history.push('/');
    } catch (error) {
      setErrors(error);
    }
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Это поле обязательно для заполнения'
      },
      isEmail: {
        message: 'Введен некорректный адрес электронной почты'
      }
    },
    name: {
      isRequired: {
        message: 'Это поле обязательно для заполнения'
      },
      min: {
        message: 'Имя должено состоять минимум из 3 символов',
        value: 3
      }
    },
    password: {
      isRequired: {
        message: 'Это поле обязательно для заполнения'
      },
      containsCapitalCharacter: {
        message: 'Пароль должен сождержать хатя бы одну заглавную букву'
      },
      containsDigit: {
        message: 'Пароль должен сождержать хатя бы одну цифру'
      },
      min: {
        message: 'Пароль должен состоять минимум из 8 символов',
        value: 8
      }
    },
    profession: {
      isRequired: {
        message: 'Обязательно выберете Вашу профессию'
      }
    },
    licence: {
      isRequired: {
        message:
          'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения'
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label={'Электронная почта:'}
        name={'email'}
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label={'Имя:'}
        name={'name'}
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextField
        label={'Пароль:'}
        type={'password'}
        name={'password'}
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <SelectField
        label='Ваша профессия:'
        name='profession'
        value={data.profession}
        defaultOption='Выберите профессию...'
        onChange={handleChange}
        options={professionsList}
        error={errors.profession}
      />
      <RadioField
        options={[
          {name: 'Муж', value: 'male'},
          {name: 'Жен', value: 'female'}
        ]}
        value={data.sex}
        name='sex'
        onChange={handleChange}
        label='Укажите Ваш пол:'
      />
      <MultiSelectField
        name='qualities'
        options={qualitiesList}
        onChange={handleChange}
        label='Выберите качества:'
        defaultValue={data.qualities}
      />
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name='licence'
        error={errors.licence}
      >
        Подтвердить <a href='#'>Лицензионное соглашение</a>
      </CheckBoxField>
      <button
        type='submit'
        disabled={!isValid}
        className='btn btn-primary w-100 mx-auto mb-2'
      >
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegisterForm;
