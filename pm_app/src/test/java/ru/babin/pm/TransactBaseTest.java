package ru.babin.pm;

import org.junit.runner.RunWith;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;


@RunWith(SpringJUnit4ClassRunner.class)
@Transactional(transactionManager="transactionManager")
@ContextConfiguration(locations = {"classpath:pm-test.xml"})
@Rollback(true)
public abstract class TransactBaseTest {

}
