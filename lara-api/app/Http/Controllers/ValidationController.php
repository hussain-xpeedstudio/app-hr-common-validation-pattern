<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ValidationController extends Controller
{
    public function getValidationRules()
    {
        $validationRules = [
            'user_id' => 'required|numeric|min:5|max:10',
            'user_email' => 'required|email',
        ];
        
        $validationMessages = [
            'user_id.required' => 'The user ID is required.',
            'user_id.numeric' => 'The user ID must be a number',
            'user_id.min' => 'The user ID must be at least 5.',
            'user_id.max' => 'The user ID must not exceed 10.',
            'user_email.required' => 'The user email is required.',
            'user_email.email' => 'Invalid email format for user email.',
        ];
        
        $response = [
            'validationRules' => $validationRules,
            'validationMessages' => $validationMessages,
        ];       
        return json_encode($response);
        //return view('form',['validationRules' => json_encode($validationRules)]);
    }
    public function index1()
    {
        $rules = [
            'user_id' => 'required|numeric|min:5|max:10',
            'user_email' => 'required|email',
        ];
        
        $messages = [
            'user_id.required' => 'The user ID is required.',
            'user_id.numeric' => 'The user ID must be a number dada.',
            'user_id.min' => 'The user ID must be at least 5.',
            'user_id.max' => 'The user ID must not exceed 10.',
            'user_email.required' => 'The user email is required.',
            'user_email.email' => 'Invalid email format for user email.',
        ];
        
        $response = [
            'rules' => $rules,
            'messages' => $messages,
        ];       
        return json_encode($response);
        //return view('form',['validationRules' => json_encode($validationRules)]);
    }
    function storeTestInput(Request $request){
        return $request->all();
    }
}
