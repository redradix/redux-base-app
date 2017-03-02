Pagination domains will be every visualization (page) that uses entities

pagination: {
  <domain>: {
    pageNumber: @number,
    pages: {
      <pageNumber>: [<...ids>]
    },
    pageSize: @number,
    total: @number
  }
}

pagination: {
  calendar: {
    tactics: {
      ids: [1,2,3,4,5],
      pageSize: undefined
    }
  },
  tacticEdit: {
    tactics: {
      ids: [3],
      pageSize: 1
    }
  },
  activityList: {
    campaigns: {
      ids: [1,2,4,6,8],
      pageSize: undefined
    }
  },
  normalist: {
    campaigns: {
      ids: [1,2,3],
      pageSize: 3
    }
  }

}
