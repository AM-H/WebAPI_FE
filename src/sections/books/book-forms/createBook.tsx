'use client';

import React from 'react';

// material-ui
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

import axios from 'utils/axios';

export default function CreateBook({ onSuccess, onError }: { onSuccess: () => void; onError: (msg: string) => void }) {
  return (
    <>
      <Formik   
        initialValues={{
          isbn13: '',
          authors: '',
          original_publication_year: '',
          original_title: '',
          title: '',
          ratings_1: 0,
          ratings_2: 0,
          ratings_3: 0,
          ratings_4: 0,
          ratings_5: 0,
          image_url: '',
          small_image_url: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          isbn13: Yup.string().required('ISBN-13 is required'),
          authors: Yup.string().required('Author(s) is required'),
          original_publication_year: Yup.number().required('Original publication year is required').min(1000, 'Year must be at least 1000'),
          original_title: Yup.string().required('Original title is required'),
          title: Yup.string().required('Title is required'),
          ratings_1: Yup.number().min(0, 'Ratings must be non-negative').required('Ratings 1 is required'),
          ratings_2: Yup.number().min(0, 'Ratings must be non-negative').required('Ratings 2 is required'),
          ratings_3: Yup.number().min(0, 'Ratings must be non-negative').required('Ratings 3 is required'),
          ratings_4: Yup.number().min(0, 'Ratings must be non-negative').required('Ratings 4 is required'),
          ratings_5: Yup.number().min(0, 'Ratings must be non-negative').required('Ratings 5 is required'),
          image_url: Yup.string().url('Must be a valid URL').required('Image URL is required'),
          small_image_url: Yup.string().url('Must be a valid URL').required('Small image URL is required')
        })}
        onSubmit={(values, { setErrors, setSubmitting, setValues, resetForm }) => {
          const bookData = {
            isbn13: values.isbn13,
            authors: values.authors,
            original_publication_year: Number(values.original_publication_year),
            original_title: values.original_title,
            title: values.title,
            ratings_1: Number(values.ratings_1),
            ratings_2: Number(values.ratings_2),
            ratings_3: Number(values.ratings_3),
            ratings_4: Number(values.ratings_4),
            ratings_5: Number(values.ratings_5),
            image_url: values.image_url,
            small_image_url: values.small_image_url
          };

          axios
            .post('c/books', bookData)
            .then((response) => {
              setSubmitting(false);
              resetForm({
                values: {
                  isbn13: '',
                  authors: '',
                  original_publication_year: '',
                  original_title: '',
                  title: '',
                  ratings_1: 0,
                  ratings_2: 0,
                  ratings_3: 0,
                  ratings_4: 0,
                  ratings_5: 0,
                  image_url: '',
                  small_image_url: '',
                  submit: null
                }
              });
              onSuccess();
            })
            .catch((error) => {
              console.error(error);
              setErrors({ isbn13: error.message });
              setSubmitting(false);
              onError(error.message);
            });
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="isbn13">ISBN-13</InputLabel>
                  <OutlinedInput
                    id="isbn13"
                    type="text"
                    value={values.isbn13}
                    name="isbn13"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter ISBN-13"
                    fullWidth
                    error={Boolean(touched.isbn13 && errors.isbn13)}
                  />
                </Stack>
                {touched.isbn13 && errors.isbn13 && (
                  <FormHelperText error id="helper-text-isbn13">
                    {errors.isbn13}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="authors">Author(s)</InputLabel>
                  <OutlinedInput
                    id="authors"
                    type="text"
                    value={values.authors}
                    name="authors"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter author(s)"
                    fullWidth
                    error={Boolean(touched.authors && errors.authors)}
                  />
                </Stack>
                {touched.authors && errors.authors && (
                  <FormHelperText error id="helper-text-authors">
                    {errors.authors}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="original_publication_year">Original Publication Year</InputLabel>
                  <OutlinedInput
                    id="original_publication_year"
                    type="number"
                    value={values.original_publication_year}
                    name="original_publication_year"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter publication year"
                    fullWidth
                    error={Boolean(touched.original_publication_year && errors.original_publication_year)}
                  />
                </Stack>
                {touched.original_publication_year && errors.original_publication_year && (
                  <FormHelperText error id="helper-text-original-publication-year">
                    {errors.original_publication_year}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="original_title">Original Title</InputLabel>
                  <OutlinedInput
                    id="original_title"
                    type="text"
                    value={values.original_title}
                    name="original_title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter original title"
                    fullWidth
                    error={Boolean(touched.original_title && errors.original_title)}
                  />
                </Stack>
                {touched.original_title && errors.original_title && (
                  <FormHelperText error id="helper-text-original-title">
                    {errors.original_title}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="title">Title</InputLabel>
                  <OutlinedInput
                    id="title"
                    type="text"
                    value={values.title}
                    name="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter title"
                    fullWidth
                    error={Boolean(touched.title && errors.title)}
                  />
                </Stack>
                {touched.title && errors.title && (
                  <FormHelperText error id="helper-text-title">
                    {errors.title}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <InputLabel>Ratings</InputLabel>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="ratings_1">1-Star Ratings</InputLabel>
                      <OutlinedInput
                        id="ratings_1"
                        type="text"
                        inputMode="numeric"
                        value={values.ratings_1}
                        name="ratings_1"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter number of 1-star ratings"
                        fullWidth
                        error={Boolean(touched.ratings_1 && errors.ratings_1)}
                        inputProps={{
                          inputMode: 'numeric',
                          pattern: '[0-9]*'
                        }}
                      />
                    </Stack>
                    {touched.ratings_1 && errors.ratings_1 && (
                      <FormHelperText error id="helper-text-ratings-1">
                        {errors.ratings_1}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="ratings_2">2-Star Ratings</InputLabel>
                      <OutlinedInput
                        id="ratings_2"
                        type="text"
                        inputMode="numeric"
                        value={values.ratings_2}
                        name="ratings_2"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter number of 2-star ratings"
                        fullWidth
                        error={Boolean(touched.ratings_2 && errors.ratings_2)}
                        inputProps={{
                          inputMode: 'numeric',
                          pattern: '[0-9]*'
                        }}
                      />
                    </Stack>
                    {touched.ratings_2 && errors.ratings_2 && (
                      <FormHelperText error id="helper-text-ratings-2">
                        {errors.ratings_2}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="ratings_3">3-Star Ratings</InputLabel>
                      <OutlinedInput
                        id="ratings_3"
                        type="text"
                        inputMode="numeric"
                        value={values.ratings_3}
                        name="ratings_3"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter number of 3-star ratings"
                        fullWidth
                        error={Boolean(touched.ratings_3 && errors.ratings_3)}
                        inputProps={{
                          inputMode: 'numeric',
                          pattern: '[0-9]*'
                        }}
                      />
                    </Stack>
                    {touched.ratings_3 && errors.ratings_3 && (
                      <FormHelperText error id="helper-text-ratings-3">
                        {errors.ratings_3}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="ratings_4">4-Star Ratings</InputLabel>
                      <OutlinedInput
                        id="ratings_4"
                        type="text"
                        inputMode="numeric"
                        value={values.ratings_4}
                        name="ratings_4"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter number of 4-star ratings"
                        fullWidth
                        error={Boolean(touched.ratings_4 && errors.ratings_4)}
                        inputProps={{
                          inputMode: 'numeric',
                          pattern: '[0-9]*'
                        }}
                      />
                    </Stack>
                    {touched.ratings_4 && errors.ratings_4 && (
                      <FormHelperText error id="helper-text-ratings-4">
                        {errors.ratings_4}
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="ratings_5">5-Star Ratings</InputLabel>
                      <OutlinedInput
                        id="ratings_5"
                        type="text"
                        inputMode="numeric"
                        value={values.ratings_5}
                        name="ratings_5"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter number of 5-star ratings"
                        fullWidth
                        error={Boolean(touched.ratings_5 && errors.ratings_5)}
                        inputProps={{
                          inputMode: 'numeric',
                          pattern: '[0-9]*'
                        }}
                      />
                    </Stack>
                    {touched.ratings_5 && errors.ratings_5 && (
                      <FormHelperText error id="helper-text-ratings-5">
                        {errors.ratings_5}
                      </FormHelperText>
                    )}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="image_url">Image URL</InputLabel>
                  <OutlinedInput
                    id="image_url"
                    type="url"
                    value={values.image_url}
                    name="image_url"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="https://example.com/book-cover.jpg"
                    fullWidth
                    error={Boolean(touched.image_url && errors.image_url)}
                  />
                </Stack>
                {touched.image_url && errors.image_url && (
                  <FormHelperText error id="helper-text-image-url">
                    {errors.image_url}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="small_image_url">Small Image URL</InputLabel>
                  <OutlinedInput
                    id="small_image_url"
                    type="url"
                    value={values.small_image_url}
                    name="small_image_url"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="https://example.com/book-cover-small.jpg"
                    fullWidth
                    error={Boolean(touched.small_image_url && errors.small_image_url)}
                  />
                </Stack>
                {touched.small_image_url && errors.small_image_url && (
                  <FormHelperText error id="helper-text-small-image-url">
                    {errors.small_image_url}
                  </FormHelperText>
                )}
              </Grid>

              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    CREATE BOOK
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
