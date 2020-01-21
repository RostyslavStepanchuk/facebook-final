import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isEmpty, get } from 'lodash'
import { Link } from 'react-router-dom'
import { TextField, CircularProgress, Avatar } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

import { getAvatarLink } from '../../utils/helpers/imageLinkHelpers'
import { searchData } from '../../actions/search'

import useStyles from './searchStyle'

const Search = ({loading, searchData, searchResults}) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])

  useEffect(() => {
    if (!isEmpty(searchResults) && !loading) {
      setOptions(searchResults)
    }
  }, [loading, searchResults])

  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  const handleInputChange = (evt, inputValue) => {
    if (inputValue.length >= 2) {
      searchData(inputValue)
    } else {
      setOptions([])
    }
  }
  const renderOption = option => (
    <Link to={`/profile/${get(option, 'username')}`} className={classes.link}>
      <div className={classes.optionWrapper}>
        <Avatar className={classes.userPhoto}
          src={getAvatarLink(option.avatar)}
          alt='User Avatar' />
        {`${get(option, 'firstName')} ${get(option, 'lastName')}`}
      </div>
    </Link>
  )

  return (
    <Autocomplete
      className={classes.searchInput}
      size='small'
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={option => option.username}
      renderOption={renderOption}
      options={options}
      loading={loading}
      onInputChange={handleInputChange}
      noOptionsText='No results found'
      renderInput={params => (
        <TextField
          {...params}
          placeholder='Search'
          fullWidth
          variant='outlined'
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading ? <CircularProgress color='inherit' size={20} /> : null}
                {params.InputProps.endAdornment}
              </Fragment>
            )
          }}
        />
      )}
    />
  )
}

Search.propTypes = {
  loading: PropTypes.bool.isRequired,
  searchData: PropTypes.func.isRequired,
  searchResults: PropTypes.array
}

const mapStateToProps = state => ({
  loading: state.search.loading,
  searchResults: state.search.searchResults
})

export default connect(mapStateToProps, { searchData })(Search)
