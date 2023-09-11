@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Testing BackForth Validation</h2>
    <form id="myForm" action="{{route('test_input')}}" method="POST">
        @csrf

        <div class="form-group">
            <label for="user_id">User Id</label>
            <input type="text" name="user_id" id="user_id" class="form-control">
        </div>

        <div class="form-group">
            <label for="user_email">User Email</label>
            <input type="text" name="user_email" id="user_email" class="form-control">
        </div>

        <!-- Add more form fields here -->

        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</div>

<script>
    $(document).ready(function () {
        var validationRules = @json($validationRules);

        $('#myForm').validate({
            rules: validationRules
        });
    });
</script>

@endsection