/*********************************************************************************
 * WEB422 – Assignment 2
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name:Salley Jeong Student ID: 111894150 Date: May 31,2019
 *
 ********************************************************************************/

// Import jQuery, which will also expose $ on the global `window` Object.
import $ from './jquery-es';
// After jQuery is loaded, we can load the Bootstrap JS, which depends on jQuery.
import 'bootstrap';

// Place your imports for Moment.js and Lodash here...
import moment from 'moment';
import _ from 'lodash';

// The rest of your code can go here.  You're also welcome to split
// your code up into multiple files using ES modules and import/export.

$(function() {
  let employeesModel = [];

  initializeEmployeesModel();

  $('#employee-search').on('keyup', function() {
    let input = $('#employee-search').val();

    let filter = getFilteredEmployeesModel(input);

    refreshEmployeeRows(filter);
  });

  $('.body-rows').on('click', '.body-row', function() {
    let employee = getEmployeeModelById($(this).attr('data-id'));

    employee.HireDate = moment(employee.HireDate).format('LL');

    let infoTemplate = _.template(
      '<strong>Address:</strong> <%- employee[0].AddressStreet %> <%- employee[0].AddressCity %>, <%- employee[0].AddressState %>. <%- employee[0].AddressZip %></br>' +
        '<strong>Phone Number:</strong> <%- employee[0].PhoneNum %> ext: <%- employee[0].Extension %></br>' +
        '<strong>Hire Date:</strong> <%- employee.HireDate %>'
    );

    let infoTemplateResult = infoTemplate({ employee: employee });

    showGenericModal(employee[0].FirstName + ' ' + employee[0].LastName, infoTemplateResult);
  });

  function initializeEmployeesModel() {
    $.ajax({
      url: 'https://whispering-bayou-22423.herokuapp.com/employees',
      type: 'GET',
      contentType: 'application/json'
    })
      .done(function(res) {
        employeesModel = res;
        refreshEmployeeRows(res);
      })
      .fail(function(err) {
        showGenericModal('Error', 'Unable to get Employees');
      });
  }

  function showGenericModal(title, message) {
    $('#genericModal .modal-title').empty();
    $('#genericModal .modal-title').append(title);

    $('#genericModal .modal-body').empty();
    $('#genericModal .modal-body').append(message);

    $('#genericModal').modal('show');
  }

  function refreshEmployeeRows(employees) {
    $('#employees-table').empty();

    let rowTemplate = _.template(
      '<% _.forEach(employees, function(employee) { %>' +
        '<div class="row body-row" data-id=<%-employee._id%>>' +
        '<div class="col-xs-4 body-column"><%-employee.FirstName%></div>' +
        '<div class="col-xs-4 body-column"><%-employee.LastName%></div>' +
        '<div class="col-xs-4 body-column"><%-employee.Position.PositionName%></div>' +
        '</div>' +
        '<% }); %>'
    );

    let rowTemplateResult = rowTemplate({ employees });

    $('#employees-table').append(rowTemplateResult);
  }

  function getFilteredEmployeesModel(filterString) {
    let filteredArray = _.filter(employeesModel, function(employee) {
      return (
        employee.FirstName.toUpperCase().includes(filterString.toUpperCase()) ||
        employee.LastName.toUpperCase().includes(filterString.toUpperCase()) ||
        employee.Position.PositionName.toUpperCase().includes(filterString.toUpperCase())
      );
    });

    return filteredArray;
  }

  function getEmployeeModelById(id) {
    let idMatching = _.filter(employeesModel, function(employee) {
      return employee._id === id;
    });
    return _.cloneDeep(idMatching);
  }
});
