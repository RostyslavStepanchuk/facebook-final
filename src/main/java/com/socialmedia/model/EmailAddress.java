package com.socialmedia.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "email_addresses")
@NoArgsConstructor
public class EmailAddress implements DbEntity<String>{

  @Id
  @Column(name = "address")
  private String address;
  @Column(name = "confirmation_uuid")
  private String confirmationId;
  @Column(name = "is_confirmed")
  private Boolean isConfirmed;

  @OneToOne(fetch = FetchType.LAZY, optional = false, mappedBy = "emailAddress")
  private ApplicationUser owner;


  @Override
  public String getId() {
    return address;
  }
}
