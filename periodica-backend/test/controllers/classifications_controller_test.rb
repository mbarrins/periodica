require 'test_helper'

class ClassificationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @classification = classifications(:one)
  end

  test "should get index" do
    get classifications_url, as: :json
    assert_response :success
  end

  test "should create classification" do
    assert_difference('Classification.count') do
      post classifications_url, params: { classification: { description: @classification.description, name: @classification.name } }, as: :json
    end

    assert_response 201
  end

  test "should show classification" do
    get classification_url(@classification), as: :json
    assert_response :success
  end

  test "should update classification" do
    patch classification_url(@classification), params: { classification: { description: @classification.description, name: @classification.name } }, as: :json
    assert_response 200
  end

  test "should destroy classification" do
    assert_difference('Classification.count', -1) do
      delete classification_url(@classification), as: :json
    end

    assert_response 204
  end
end
