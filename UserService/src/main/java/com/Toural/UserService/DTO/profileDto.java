package com.Toural.UserService.DTO;

public class profileDto {
    String name;
    String email;
    String phoneNo;
    String type;
    String dob;
    String address;

    String pic;

    public profileDto(String name, String email, String phoneNo, String type, String dob, String address, String pic) {
        this.name = name;
        this.email = email;
        this.phoneNo = phoneNo;
        this.type = type;
        this.dob = dob;
        this.address = address;
        this.pic = pic;
    }

    public profileDto() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPic() {
        return pic;
    }

    public void setPic(String pic) {
        this.pic = pic;
    }
}
