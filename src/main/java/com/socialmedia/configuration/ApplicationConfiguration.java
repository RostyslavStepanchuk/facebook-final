package com.socialmedia.configuration;

import com.amazonaws.auth.PropertiesFileCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.socialmedia.util.SmartCopyBeanUtilsBean;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.modelmapper.config.Configuration.AccessLevel.PRIVATE;

@Configuration
public class ApplicationConfiguration {

  @Value("${amazonProperties.credentials.path}")
  private String s3CredentialsPath;

  @Bean
  public BCryptPasswordEncoder bcryptPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public AmazonS3Client amazonS3Client() {
    return (AmazonS3Client) AmazonS3ClientBuilder
            .standard()
            .withRegion(Regions.US_WEST_2)
            .withCredentials(new PropertiesFileCredentialsProvider(s3CredentialsPath))
            .build();
  }

  @Bean
  public ModelMapper modelMapper() {
    ModelMapper mapper = new ModelMapper();
    mapper.getConfiguration()
        .setMatchingStrategy(MatchingStrategies.STRICT)
        .setFieldMatchingEnabled(true)
        .setSkipNullEnabled(true)
        .setFieldAccessLevel(PRIVATE);
    return mapper;
  }

  @Bean
  public SmartCopyBeanUtilsBean smartCopyBeanUtilsBean() {
    return new SmartCopyBeanUtilsBean();
  }

}
