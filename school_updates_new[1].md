Changes:

1.  Result report group OPS
    a. API to create
    API: post /register_new_item/RESULT_REPORT_GROUP
    payload: {"item_name":"Unit Test 1"}

    b. API to update
    API: post /update_item/RESULT_REPORT_GROUP
    payload: {
    "item_name":"Update",
    "item_id":"1"
    }

    c. API to delete
    API: post /delete_item/RESULT_REPORT_GROUP
    payload: {"item_id":"2"}

    d. API to fetch all
    API: get /new_table_data/RESULT_REPORT_GROUP

2.  Result Criteria Group OPS
    a. API to create
    API: post /register_new_item/RESULT_CRITERIA_GROUP
    payload: {"item_name":"Unit Test 1"}

    b. API to update
    API: post /update_item/RESULT_CRITERIA_GROUP
    payload: {
    "item_name":"Update",
    "item_id":"1"
    }

    c. API to delete
    API: post /delete_item/RESULT_CRITERIA_GROUP
    payload: {"item_id":"2"}

    d. API to fetch all
    API: get /new_table_data/RESULT_CRITERIA_GROUP

3.  Result Criteria OPS
    a. API to create new result criteria group with criteria
    API: post /result_criteria_ops/insert
    payload: {
    "result_criteria_group_id": 1,
    "criteria":[
    {
    "criteria_name":"First",
    "max_marks":100,
    "min_marks":75,
    "grade":"First",
    "isFailCondidtion":0
    },
    {
    "criteria_name":"Second",
    "max_marks":74,
    "min_marks":60,
    "grade":"First",
    "isFailCondidtion":0
    },
    {
    "criteria_name":"Pass",
    "max_marks":59,
    "min_marks":0,
    "grade":"First",
    "isFailCondidtion":0
    }

            ]
        }

    c. API to update specific criteria data
    API: post /result_criteria_ops/update
    payload: {
    "result_criteria_group_id" : 1,
    "criteria_id" : 1,
    "criteria_name" : "New naaame",
    "min_marks" : 50,
    "max_marks" : 50,
    "grade" : "DD",
    "isFailCondidtion" : 0
    }

    d. API tp fetch all result criteria groups
    API: get /new_table_data/RESULT_CRITERIA_GROUP

    e. API to fetch result criteria for specific crteria group
    API: get /specific_table_data/RESULT_CRITERIA_BY_GROUP_ID/group_id

    f. To fetch criteria with resprctive group
    API: post /result_criteria_ops/fetch

    g. API to delete criteria by group
    API: post /result_criteria_ops/GROUP/delete
    payload: {"result_criteria_group_id" : 1}

    h. To delete specific criteria
    API: /result_criteria_ops/CRITERIA/delete
    payload: {"criteria_id" : 1}

4.  Result Report Master OPS
    a. To create new result report academic particular wise
    API: post /result_report_master_ops/insert
    payload: {
    "result_report_group_id":1,
    "report_allocs":[
    {
    "academic_id":3,
    "department_id":2,
    "class_id":1,
    "division_id":1,
    "result_date":"",
    "exam_date":""
    },
    {
    "academic_id":3,
    "department_id":2,
    "class_id":1,
    "division_id":2,
    "result_date":"",
    "exam_date":""
    },
    {
    "academic_id":3,
    "department_id":2,
    "class_id":1,
    "division_id":3,
    "result_date":"",
    "exam_date":""
    }
    ]
    }

    b. To update speicific result report
    API: post /result_report_master_ops/update
    payload: {
    "result_report_group_id": 1,
    "report_id":1,
    "academic_id":3,
    "department_id":2,
    "class_id":1,
    "division_id":1,
    "result_date":"24-02-2023",
    "exam_date":"20-02-2023",
    "result_criteria_group_id":1
    }

    c. To delete report
    API: post /result_report_master_ops/delete
    payload: {"report_id":1}
